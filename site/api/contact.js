module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed', method: req.method });
    }

    try {
        var body = req.body;
        if (!body || !body.name || !body.email || !body.company) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        var html = [
            '<h2>Move It for Teams &mdash; Early Access Request</h2>',
            '<table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;">',
            '<tr><td style="padding:8px 16px 8px 0;color:#555;"><strong>Name</strong></td><td>' + escHtml(body.name) + '</td></tr>',
            '<tr><td style="padding:8px 16px 8px 0;color:#555;"><strong>Email</strong></td><td><a href="mailto:' + escHtml(body.email) + '">' + escHtml(body.email) + '</a></td></tr>',
            '<tr><td style="padding:8px 16px 8px 0;color:#555;"><strong>Company</strong></td><td>' + escHtml(body.company) + '</td></tr>',
            '<tr><td style="padding:8px 16px 8px 0;color:#555;"><strong>Team size</strong></td><td>' + escHtml(body.team_size || 'Not specified') + '</td></tr>',
            '</table>'
        ].join('');

        var payload = {
            from: 'Move It <noreply@mail.moveit.work>',
            to: ['jarrod@connectedpe.com'],
            subject: 'Move It for Teams — Early Access: ' + body.company,
            html: html,
            reply_to: body.email
        };

        var response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + process.env.RESEND_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            return res.status(200).json({ ok: true });
        }

        return res.status(500).json({ error: 'Failed to send' });

    } catch (e) {
        return res.status(500).json({ error: 'Failed to send' });
    }
};

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
