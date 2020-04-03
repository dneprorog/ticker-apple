import io from 'socket.io-client';
import { setTick } from '../../app/actions/setTick';

export function getTicker(callback) {
    const ticker = location.hash.substr(1);
    const socket = io.connect('http://localhost:4000');
    socket.emit('ticker', ticker);
    socket.on(ticker, responce => callback(responce));
}

export default () => {
    return dispatch => {
        getTicker(responce => {
            dispatch(setTick(JSON.parse(responce)));
        });
    };
};
