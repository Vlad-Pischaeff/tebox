'use strict';

const PORT = 5000;

module.exports = async (server) => {
    try {
        await server.listen(PORT, () => {
            console.log(`🚀 HTTP Server -> started on port ${PORT}`);
        });
    } catch (e) {
        console.log('SERVER ERRORS', e);
    }
};
