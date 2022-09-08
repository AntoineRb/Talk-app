const config = {
    port: process.env.PORT || "4004",
    rsaPrivateKeyPath: process.env.PRODUCTION ? 'Insert production key path here...' : __dirname.replace('src', 'rsa.private.key'),
    rsaPublicKeyPath: process.env.PRODUCTION ? 'Insert production key path here...' : __dirname.replace('src', 'rsa.pub.key'),
}
export default config;