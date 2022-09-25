// this could be fetched from a database
export const message = 'Sign this message to prove you own the address';

function getMessage(req, res) {
    res.json({ message });
}

export default getMessage;