// Vercel Serverless Function: /api/admin-auth
module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }

    try {
        let body = req.body;
        if (typeof body === 'string') {
            try { body = JSON.parse(body); } catch (_) {}
        }
        const password = body ? body.password : null;

        if (!password) {
            return res.status(400).json({ success: false, error: 'Password is required' });
        }

        // Server-side secret verification against environment variable
        const ADMIN_SECRET = process.env.ADMIN_PASSWORD || 'madam2025';

        if (password === ADMIN_SECRET) {
            const token = Buffer.from(`admin_${Date.now()}_auth`).toString('base64');
            return res.status(200).json({
                success: true,
                token: token,
                message: 'Authentication successful'
            });
        } else {
            return res.status(401).json({
                success: false,
                error: 'Access Denied: Incorrect Password'
            });
        }
    } catch (err) {
        console.error('Serverless auth error:', err);
        return res.status(500).json({ success: false, error: 'Internal server error during authentication' });
    }
};
