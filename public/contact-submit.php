<?php
/**
 * OxLand — contact form handler
 * -----------------------------------------------------------------------------
 * Receives the contact / demo form (JSON or normal POST), emails the enquiry to
 * both inboxes below, and returns a small JSON response the front-end reads.
 *
 * Works on any standard PHP host (Hostinger, cPanel, etc.) with mail() enabled.
 * If your host requires SMTP instead of mail(), swap the send_mail() body for
 * PHPMailer — everything else can stay the same.
 *
 * CONFIG — edit these two lines if the address ever changes:
 */
$TO_EMAIL   = 'info@oxbowintellect.com, manual.control7688@gmail.com'; // both receive enquiries
$FROM_EMAIL = 'no-reply@oxbowintellect.com';             // must be an address on THIS server's domain for best deliverability
// -----------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');

// Only allow POST.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Accept either a JSON body or a classic form POST.
$raw  = file_get_contents('php://input');
$data = [];
if ($raw !== '' && $raw !== false) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (empty($data)) {
    $data = $_POST;
}

// Small helper to pull + trim a field.
function field($data, $key) {
    return isset($data[$key]) ? trim((string) $data[$key]) : '';
}

// Honeypot — real users never fill this hidden field; bots do. Pretend success.
if (field($data, 'company_website') !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$name    = field($data, 'name');
$email   = field($data, 'email');
$phone   = field($data, 'phone');
$company = field($data, 'company');
$project = field($data, 'projectType');
$parcels = field($data, 'parcels');
$pdate   = field($data, 'preferredDate');
$pslot   = field($data, 'preferredSlot');
$message = field($data, 'message');
$reason  = field($data, 'reason'); // which form / context it came from

// Required fields.
if ($name === '' || $email === '' || $phone === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please fill in your name, email and phone.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

// Strip CR/LF from anything that goes into a header to prevent header injection.
function clean_header($v) {
    return str_replace(["\r", "\n", "%0a", "%0d"], '', $v);
}
$safeName  = clean_header($name);
$safeEmail = clean_header($email);

// RFC 2047 encoded words, with UTF-8 characters kept intact and folded headers.
// Uses core PHP functions so the host does not need the mbstring extension.
function encode_mail_header($value) {
    $characters = preg_split('//u', clean_header($value), -1, PREG_SPLIT_NO_EMPTY);
    if ($characters === false) {
        return ''; // malformed UTF-8 cannot produce a valid UTF-8 header
    }
    $words = [];
    $chunk = '';
    foreach ($characters as $character) {
        // Leave room for the Subject/Reply-To prefix within a folded line.
        if (strlen($chunk . $character) > 39) {
            $words[] = '=?UTF-8?B?' . base64_encode($chunk) . '?=';
            $chunk = '';
        }
        $chunk .= $character;
    }
    if ($chunk !== '') $words[] = '=?UTF-8?B?' . base64_encode($chunk) . '?=';
    return implode("\r\n ", $words);
}

// Build the email body.
$lines = [
    'New enquiry from the OxLand website',
    '-----------------------------------',
    'Name:          ' . $name,
    'Email:         ' . $email,
    'Phone:         ' . $phone,
];
if ($company !== '') $lines[] = 'Company:       ' . $company;
if ($project !== '') $lines[] = 'Project type:  ' . $project;
if ($parcels !== '') $lines[] = 'Parcels/scale: ' . $parcels;
if ($pdate   !== '') $lines[] = 'Preferred date:' . ' ' . $pdate;
if ($pslot   !== '') $lines[] = 'Preferred slot:' . ' ' . $pslot;
if ($reason  !== '') $lines[] = 'Source:        ' . $reason;
$lines[] = '';
$lines[] = 'Message:';
$lines[] = ($message !== '' ? $message : '(none)');
$body = preg_replace('/\r\n|\r|\n/', "\r\n", implode("\n", $lines));
// Encode the body to preserve Unicode and keep transport lines below 70 bytes.
$body = chunk_split(base64_encode($body), 68, "\r\n");

$subject = encode_mail_header('New enquiry from ' . $safeName . ($company !== '' ? ' · ' . clean_header($company) : ''));

$headers  = 'From: OxLand Website <' . $FROM_EMAIL . ">\r\n";
$headers .= 'Reply-To: ' . encode_mail_header($safeName) . "\r\n <" . $safeEmail . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "Content-Transfer-Encoding: base64\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = @mail($TO_EMAIL, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not send your message. Please email ' . $TO_EMAIL . ' directly.']);
}
