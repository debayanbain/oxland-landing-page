<?php
// Run with: php -n scripts/contact-mail.test.php [success|failure]
// Evaluate the actual handler in this namespace; mail() is captured, never sent.
namespace OxlandContactTest;

function expect($condition, $message) {
    if (!$condition) throw new \RuntimeException($message);
}

function decode_header($header) {
    preg_match_all('/=\?UTF-8\?B\?([A-Za-z0-9+\/=]+)\?=/', $header, $matches);
    $decoded = '';
    foreach ($matches[0] as $index => $word) {
        expect(strlen($word) <= 75, 'Encoded header word is too long');
        $chunk = base64_decode($matches[1][$index], true);
        expect($chunk !== false && preg_match('//u', $chunk) === 1, 'UTF-8 split inside a header word');
        $decoded .= $chunk;
    }
    return $decoded;
}

function mail($to, $subject, $body, $headers) {
    $GLOBALS['mailCaptured'] = true;
    expect($to === 'info@oxbowintellect.com, manual.control7688@gmail.com', 'Recipient routing changed');
    $expectedSubject = 'New enquiry from ' . $_POST['name'] . ' · ' . $_POST['company'];
    expect(decode_header($subject) === $expectedSubject, 'Unicode subject did not round-trip');
    preg_match('/Reply-To: (.*?) <([^>]+)>/s', $headers, $reply);
    expect(decode_header($reply[1]) === $_POST['name'], 'Reply-To name did not round-trip');
    expect($reply[2] === $_POST['email'], 'Reply-To address changed');
    expect(str_contains($headers, 'Content-Transfer-Encoding: base64'), 'Missing transfer encoding');
    expect(str_contains($headers, 'MIME-Version: 1.0'), 'Missing MIME version');
    expect(!preg_match('/(?<!\r)\n|\r(?!\n)/', $headers), 'Incorrect header line endings');
    foreach (explode("\r\n", 'Subject: ' . $subject . "\r\n" . $headers) as $line) {
        if (str_contains($line, '=?UTF-8?B?')) expect(strlen($line) <= 76, 'Encoded header line is too long');
    }
    foreach (explode("\r\n", trim($body)) as $line) {
        expect(strlen($line) <= 70, 'Email transport line is too long');
    }
    $decodedBody = base64_decode($body, true);
    expect($decodedBody !== false && preg_match('//u', $decodedBody) === 1, 'Email body is not valid Unicode');
    expect(!preg_match('/(?<!\r)\n|\r(?!\n)/', $decodedBody), 'Incorrect decoded body line endings');
    expect(str_contains($decodedBody, 'Name:          ' . $_POST['name']), 'Submitted name missing');
    expect(str_contains($decodedBody, "First\r\nSecond\r\nThird\r\nFourth"), 'Multiline message changed');
    return ($GLOBALS['scenario'] ?? 'success') !== 'failure';
}

$GLOBALS['scenario'] = $argv[1] ?? 'success';
$_SERVER['REQUEST_METHOD'] = 'POST';
$_POST = [
    'name' => str_repeat('客户 शर्मा Élodie ', 8) . 'Test',
    'email' => 'customer@example.com',
    'phone' => '0000000000',
    'company' => 'Oxland – परीक्षण',
    'projectType' => 'GIS test',
    'message' => "First\r\nSecond\nThird\rFourth\n客户 message",
    'reason' => 'automatic-demo',
    'company_website' => '',
];
$handler = file_get_contents(__DIR__ . '/../public/contact-submit.php');
ob_start();
eval('namespace OxlandContactTest; ' . preg_replace('/^<\?php\s*/', '', $handler));
$response = json_decode(ob_get_clean(), true);
expect($GLOBALS['mailCaptured'] ?? false, 'Handler never reached email sending');
expect($response['ok'] === ($GLOBALS['scenario'] !== 'failure'), 'Incorrect success or error response');
expect(http_response_code() === ($GLOBALS['scenario'] === 'failure' ? 500 : false), 'Incorrect HTTP response status');
echo "PASS: {$GLOBALS['scenario']} — recipients, UTF-8 headers/body, reply address and response verified; no mail sent.\n";
