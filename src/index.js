import { getByDisplayValue } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


class Add extends React.Component {
    render() {
        return (
            <button className="add" onClick={() => alert('clic')}>
                New Task
                {/* TODO */}
            </button>
        );
    }
}

class Search extends React.Component {
    render() {
        return (
            <input type="text" placeholder="Catégorie, Mots-clés..">
                {/* TODO */}
            </input>
        );
    }
}

class Tasks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: this.props.isChecked,
            title: this.props.title,
        }
    }

    render() {

        if (this.props.isChecked == false) {
            return (
                <li>
                    <input type="checkbox" id="check-task" name="check-task" onChange={this.props.checkOrUncheck}></input>
                    <label for="check-task">{this.props.title}</label>
                </li>
            );
        }
        else {
            return (
                <li>
                    <input type="checkbox" id="check-task" name="check-task" checked onChange={this.props.checkOrUncheck}></input>
                    <label for="check-task">{this.props.title}</label>
                </li>
            );
        }
    }
}

// ========================================

class Header extends React.Component {

    render() {
        const title = 'Bienvenue dans mon app de ToDoList !';
        const task = "Prog = " + this.props.done + " / " + this.props.all;

        return (
            <header>
                {title}
                <br></br>
                {task}
            </header>
        );
    }
}

class Body extends React.Component {
    render() {

        return (
            <div className="app-body">
            </div>
        );
    }
}

class Footer extends React.Component {
    addButton() {
        return <Add />;
    }

    searchBar() {
        return <Search />
    }

    render() {

        return (
            <div className="footer">
                {this.searchBar()}
                {this.addButton()}
            </div>
        );
    }
}

// ========================================

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            tasks: [
                { "title": "1.Idée", "isChecked": true },
                { "title": "2.Marché", "isChecked": true },
                { "title": "3.Wireframe", "isChecked": true },
                { "title": "4.Design", "isChecked": true },
                { "title": "5.Landingpage", "isChecked": true },
                { "title": "6.Développement", "isChecked": false },
                { "title": "7.Publish", "isChecked": false },
                { "title": "8.Pub", "isChecked": false },
                { "title": "9.Feedback", "isChecked": false }],
        }
    }

    checkOrUncheck(position){
        let newTasks = this.state.tasks.slice();
        newTasks[position]['isChecked'] = !newTasks[position]['isChecked'];

        this.setState({
            tasks: newTasks,
        })

    }

    parseTasks() {
        const reformattedTab = this.state.tasks.map((element, index) => <Tasks key={index} title={element.title} isChecked={element.isChecked} checkOrUncheck={() => this.checkOrUncheck(index)}/>);

        return reformattedTab;
    }

    howMuchChecked() {

        var cpt = 0;

        for (let parcours = 0; parcours < this.state.tasks.length; ++parcours) {
            if (this.state.tasks[parcours]["isChecked"] == true) {
                ++cpt;
            }
        }

        return (cpt);
    }

    render() {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks))

        return (

            <div className="app">
                <div className="app-header">
                    <Header done={this.howMuchChecked()} all={this.state.tasks.length} />
                </div>

                <div>
                    {this.parseTasks()}
                </div>

                <div className="app-footer">
                    <Footer />
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
