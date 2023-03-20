import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import poubelle from './images/poubelle-de-recyclage.png';
import haut from './images/fleche-vers-le-haut.png';
import bas from './images/fleche-vers-le-bas.png';


class AddBar extends React.Component {
    constructor() {
        super();
        
        this.state = {
          clicked: false
        };
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.addTab();
        document.getElementById("add-bar").value = "";
      }

    render() {
      return (
        <div>
            <input id="add-bar" className="search" type="text" placeholder="Titre de votre task"/>
            <button className="add" onClick={this.handleClick}>
                +
            </button>
        </div>
      );
    }  
  }
  

class Add extends React.Component {
    constructor() {
        super();
        
        this.state = {
          clicked: false
        };
        
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
          clicked: true
        });
      }
      

    render() {
        return (
            <div>
                <button className="add" onClick={this.handleClick}>
                New Task
                </button>
                {this.state.clicked ? <AddBar addTab={this.props.addTab} /> : null}
            </div>
        );
    }
}

class Search extends React.Component {
    render() {
        return (
            <input className="search" type="text" placeholder="Recherche par mots-clés..">
                {/* TODO */}
            </input>
        );
    }
}

// ========================================

class Header extends React.Component {

    render() {
        const title = 'Bienvenue sur ToDoGood';
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

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log("Tasks", this)
        this.props.suppTab();
      }

    render() {
        console.log('Tasks', this.props);

        return (
            <li className="form-control">
                <input type="checkbox" id="check-task" name="check-task" checked={this.props.isChecked} onChange={this.props.checkOrUncheck}></input>
                <label htmlFor="check-task">{this.props.title}</label>
                <button className="add" ><img class="mouv" src={haut} alt="haut"></img></button>
                <button className="add" ><img class="mouv" src={bas} alt="bas"></img></button>
                <button className="add" onClick={this.handleClick}><img class="poubelle" src={poubelle} alt="poubelle"></img></button>
            </li>
        );
    }
}

class Footer extends React.Component {
    addButton() {
        return <Add addTab={this.props.addTab}/>;
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

    addToTab(){

        let newTasks = this.state.tasks.slice();
        newTasks.push({'title': document.getElementById('add-bar').value, 'isChecked': false});

        this.setState({
            tasks: newTasks,
        })
    }

    suppToTab(key){
        let newTasks = this.state.tasks.slice();
        newTasks.splice(key, 1);

        this.setState({
            tasks: newTasks,
        })
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

        const reformattedTab = this.state.tasks.map((element, index) => <Tasks key={index} title={element.title} isChecked={element.isChecked} suppTab={() => { console.log("supp", index); this.suppToTab(index)}} checkOrUncheck={() => this.checkOrUncheck(index)}/>);

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

                <div className="corps">
                    {this.parseTasks()}
                </div>

                <div className="app-footer">
                    <Footer addTab={() => this.addToTab()}/>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
