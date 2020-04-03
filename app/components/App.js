import '../styles/application.scss';
import { connect as serviceConnect } from '../services';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
    AreaChart,
    Area,
    Brush,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar
} from 'recharts';

import setTick from '../middleware/getTicker';

// The below line is here as an example of getting prices
serviceConnect('AAPL');

class App extends PureComponent {
    componentDidMount() {
        this.props.setTick();
    }

    getPrice() {
        const { tick } = this.props;
        if (tick.length) {
            return tick[tick.length - 1].price;
        }
    }

    prevPrice() {
        const { tick } = this.props;
        if (tick.length > 1) {
            return tick[tick.length - 2].price;
        }
    }

    getChange() {
        const { tick } = this.props;
        if (tick.length) {
            return tick[tick.length - 1].change;
        }
    }

    getChangePercent() {
        const { tick } = this.props;
        if (tick.length) {
            return tick[tick.length - 1].change_percent;
        }
    }

    render() {
        const price = this.getPrice();
        const prevPrice = this.prevPrice();
        const change = this.getChange();
        const changePercent = this.getChangePercent();

        return (
            <div className="stock-ticker">
                <div className="date-container">
                    <span>APPLE INC</span>
                    <span
                        className={`change-price ${
                            price > prevPrice ? 'positive' : 'negative'
                        }`}
                    >
                        {price}
                    </span>
                    <span className="currency">USD</span>
                    <span
                        className={`change-percent ${
                            change > 0 ? 'positive' : 'negative'
                        }`}
                    >
                        {change}
                    </span>
                    <span
                        className={`change-percent ${
                            changePercent > 0 ? 'positive' : 'negative'
                        }`}
                    >
                        {changePercent}%
                    </span>
                </div>

                <AreaChart
                    width={1000}
                    height={500}
                    data={this.props.tick}
                    margin={{ top: 10, right: 30, left: 50, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="last_trade_time"
                        tickFormatter={timeStr =>
                            moment(timeStr).format('HH:mm:ss')
                        }
                    />
                    <YAxis orientation="right" dataKey="price" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#7171ff"
                        strokeOpacity={0.9}
                        fillOpacity={0.6}
                        fill="#00d4ff"
                    />
                    <Brush
                        dataKey="price"
                        height={100}
                        stroke="#0072ff"
                        startIndex={0}
                        endIndex={0}
                    >
                        <BarChart>
                            <Bar dataKey="change_percent" fill="#8884d8" />
                        </BarChart>
                    </Brush>
                </AreaChart>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setTick
};

const mapStateToProps = state => ({
    tick: state.tick
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
