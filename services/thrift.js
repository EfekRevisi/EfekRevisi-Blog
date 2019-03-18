import {
    TBufferedTransport,
    TBinaryProtocol,
    Multiplexer,
    createConnection
} from 'thrift';
import Services from './services';

class ThriftHandler {
    _connection = null;
    _client = null;

    constructor(host, port) {
        this.config = { host, port };
        this._client = new Multiplexer();
    }

    setConnection({ host, port }) {
        console.log('set connection');
        const transport = TBufferedTransport;
        const protocol = TBinaryProtocol;

        this._connection = createConnection(host, port, {
            transport,
            protocol
        });

        this._connection.on('error', function(err) {
            console.log(err);
        });

        return this;
    }

    setClient() {
        Services.map((item) => {
            this._client.createClient(
                item.name,
                item.client,
                this._connection
            );
        });

        return this;
    }

    run() {
        this.setConnection(this.config);
        this.setClient();

        return this;
    }

    endConnection() {
        console.log('end connection');
        this._connection.end();

        return this;
    }
}

export default ThriftHandler;
