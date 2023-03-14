import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


class Add extends React.Component {
    render() {
        return (
            <button class="add" onClick={() => alert('clic')}>
                New Task
                {/* TODO */}
            </button>
        );
    }
}

class Search extends React.Component {
    render() {
        return (
            <input class="search" type="text" placeholder="Catégorie, Mots-clés..">
                {/* TODO */}
            </input>
        );
    }
}

// ========================================

class Header extends React.Component {

    render() {
        const title = 'Bienvenue sur ToDoGood !';
        const task = "Tâches accomplies = " + this.props.done + " / " + this.props.all;

        return (
            <header>
                {title}
                <br></br>
                {task}
            </header>
        );
    }
}

class Tasks extends React.Component {
    render() {

        if (this.props.isChecked === false) {
            return (
                <li class="form-control">
                    <input type="checkbox" id="check-task" name="check-task" onChange={this.props.checkOrUncheck}></input>
                    <label htmlFor="check-task">{this.props.title}</label>
                </li>
            );
        }
        else {
            return (
                <li class="form-control">
                    <input type="checkbox" id="check-task" name="check-task" checked onChange={this.props.checkOrUncheck}></input>
                    <label htmlFor="check-task">{this.props.title}</label>
                </li>
            );
        }
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

        localStorage.setItem('tasks', JSON.stringify(newTasks));
    }

    parseTasks() {
        //LOCAL STORAGE A FAIRE A LA FIN
        /*let tabb = [];
        let tab = localStorage.getItem('tasks');
        tab = JSON.parse(tab);

        for(var element in tab){
            tabb.push(<Tasks key={element} title={tab[element].title} isChecked={tab[element].isChecked} checkOrUncheck={() => this.checkOrUncheck(element)}/>);
            console.log(element);
        }

        return(tabb);*/

        const reformattedTab = this.state.tasks.map((element, index) => <Tasks key={index} title={element.title} isChecked={element.isChecked} checkOrUncheck={() => this.checkOrUncheck(index)}/>);

        return(reformattedTab);
    }

    howMuchChecked() {

        var cpt = 0;

        for (let parcours = 0; parcours < this.state.tasks.length; ++parcours) {
            if (this.state.tasks[parcours]["isChecked"] === true) {
                ++cpt;
            }
        }

        return (cpt);
    }

    render() {

        return (

            <div className="app">
                <div className="app-header">
                    <Header done={this.howMuchChecked()} all={this.state.tasks.length} />
                </div>

                <div class="corps">
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
