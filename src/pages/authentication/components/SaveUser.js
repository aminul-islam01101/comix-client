const SaveUser = (email, name, setUserEmail) => {
    const user = { name, email };
    fetch('https://comix-server.vercel.app/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .then(() => {
            setUserEmail(email);
        });
};
export default SaveUser;
