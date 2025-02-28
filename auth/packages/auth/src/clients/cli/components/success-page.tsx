export function SuccessPage({ port }: { port: string }) {
    return (
        <html>
            <head>
                <style dangerouslySetInnerHTML={{
                    __html: `
.message-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    padding: 0;
}

.hidden {
    display: none;
}
                    `
                }} type="text/css"></style>
            </head>
            <body>
                <div className="message-container">
                    <div className="success hidden">
                        <h1>Success!</h1>
                        <p>Now you can close this window and return to the CLI.</p>
                    </div>
                    <div className="loading">
                        <p>Loading...</p>
                    </div>
                    <div className="error hidden">
                        <h1>Error</h1>
                        <p>Something went wrong. Please try again.</p>
                    </div>
                </div>
                <script dangerouslySetInnerHTML={{
                    __html: `
const hash = window.location.hash.slice(1);
const params = new URLSearchParams(hash);
const paramsObj = {};
for (const [key, value] of params) {
    paramsObj[key] = value;
}
fetch('http://localhost:${port}', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(paramsObj),
}).then(() => {
    document.querySelector('.loading').classList.add('hidden');
    document.querySelector('.success').classList.remove('hidden');
}).catch(() => {
    document.querySelector('.loading').classList.add('hidden');
    document.querySelector('.error').classList.remove('hidden');
});
`
                }} type="text/javascript"></script>
            </body>
        </html>
    );
}