import React, {Component} from 'react';

class Suggestions extends Component {
    state = {}

    renderList(items) {
        let suggestions;

        if (items && items.length > 0) {
            suggestions = items.map((item, index) => {
                return <><li onClick={() => this.props.searchWord(item.title, 'search')}>{item.title}</li></>
            })
        } else {
            suggestions = <li>No suggestions found</li>
        }

        return <ul>{suggestions}</ul>
    }

    render() {
        const { items } = this.props;
        return (<>
            {this.renderList(items)}
        </>);
    }
}

export default Suggestions
