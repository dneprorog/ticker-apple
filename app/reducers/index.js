import { SET_TICK } from '../actions/setTick';

const initialState = {
    tick: []
};

const stockTicker = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICK:
            return {
                ...state,
                tick: state.tick.concat([action.payload])
            };

        default:
            return state;
    }
};

export default stockTicker;
