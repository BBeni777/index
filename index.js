import fetch from 'node-fetch';

export default async function handler(req, res) {
  const user = req.query.user;
  if (!user) return res.status(400).json({ error: 'Missing user' });
  try {
    const response = await fetch(`https://kick.com/api/v1/channels/${user}`);
    if (!response.ok) throw new Error('Kick API error');
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ is_live: data.is_live, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
