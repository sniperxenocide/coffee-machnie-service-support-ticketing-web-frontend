import React, {Component, useState} from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from '../../node_modules/react-plotly.js/react-plotly';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

const PlotlyRenderers = createPlotlyRenderers(Plot);

export default class PivotChart extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return <div>
            <PivotTableUI
                data={this.props.reportData}
                rows={this.props.rows}
                cols={this.props.cols}
                vals={this.props.vals}
                aggregatorName="Integer Sum"
                onChange={s => this.setState(s)}
                rendererName="Grouped Column Chart"
                renderers={Object.assign({},/*TableRenderers,*/PlotlyRenderers)}
                {...this.state}
            />
        </div>
    }
}