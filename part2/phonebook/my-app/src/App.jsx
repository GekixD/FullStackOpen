import { useState, useEffect } from 'react';
import axios from 'axios';
import personsServicecs from './services/notes';

const Numbers = (props) => {
    return (
        <>
            <h2>Numbers</h2>
            {props.persons.map(
                item => <Person key={item.id} name={item.name} phone={item.number} onClick={() => props.onClick(item)} />
            )}
        </>
    );
};

const Message = (props) => {
    if (props.message === '') {
        return null
    }

    let styleBlueprint = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    switch (props.type) {
        case 'error':
            styleBlueprint = { ...styleBlueprint, color: 'red' };
            break;
        case 'success':
            styleBlueprint = { ...styleBlueprint, color: 'green' };
            break;
        case 'warning':
            styleBlueprint = { ...styleBlueprint, color: 'yellow' };
            break;
        default:
            break;
    }

    return (
        <div style={styleBlueprint}>
            {props.message}
        </div>
    )
}

const Person = (props) => {
    return (
        <p>{props.name} {props.phone} <button onClick={props.onClick}>delete</button></p>
    );
};

const Form = (props) => {
    return (
        <>
            <form onSubmit={props.onSubmit}>
                <div>name: <input value={props.name} onChange={props.onChangeName} /></div>
                <div>phone: <input value={props.phone} onChange={props.onChangePhone} /></div>
                <div><button type='submit'>add</button></div>
            </form>
        </>
    );
};

const Search = (props) => {
    return (
        <>
            filter shown with <input value={props.search} onChange={props.onChange} />
        </>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');
    const [msgType, setMsgType] = useState('none');

    useEffect(() => {
        console.log('triggering fetching of phonebook')
        personsServicecs
            .getAll()
            .then(personsList => {
                console.log('promise fulfilled')
                setPersons(personsList)
            })
    }, [])
    console.log(`render ${persons.length} entries`)

    const handleNewName = e => setNewName(e.target.value);

    const handleNewNumber = e => setNewNumber(e.target.value);

    const handleSearch = e => setSearch(e.target.value);

    const handleMessage = (msg, type) => {
        setMessage(msg);
        setMsgType(type);
    };

    const resetMessage = () => {
        setMessage('');
        setMsgType('none');
    }

    const addPerson = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            number: newNumber,
        };
        const existingPerson = persons.find(item => item.name === newPerson.name);
        console.log(existingPerson);
        if (existingPerson) {
            const message = `${newPerson.name} already added to phonebook, do you want to replace the old number with a new one?`
            if (window.confirm(message)) {
                const changedPerson = { ...newPerson, id: existingPerson.id }
                console.log(changedPerson)
                personsServicecs
                    .updateItem(changedPerson.id, changedPerson)
                    .then(changedPerson => {
                        console.log(changedPerson)
                        setPersons(
                            persons
                                .map(
                                    item =>
                                        item.id === changedPerson.id
                                            ? changedPerson
                                            : item
                                )
                        )
                    })
                    .catch(e => {
                        handleMessage(`{newPerson.name} info has already been removed from server!`, 'error');
                        setTimeout(() => {
                            resetMessage();
                        }, 5000);
                    });
                handleMessage(`${newPerson.name} number succesfully updated!`, 'success');
                setTimeout(() => {
                    resetMessage();
                }, 5000);
            };
        } else {
            personsServicecs
                .createItem(newPerson)
                .then(newPerson => {
                    console.log
                    setPersons(persons.concat(newPerson));
                    setNewName('');
                    setNewNumber('');
                });
            handleMessage(`${newPerson.name} succesfully added!`, 'success');
            setTimeout(() => {
                resetMessage();
            }, 5000);
        };
    };


    const DeletePerson = (person) => {
        if (window.confirm(`Are you sure you want to delete ${person.name}`)) {
            personsServicecs
                .deleteItem(person.id)
                .then(deletedItem => setPersons(persons.filter(item => item.id !== deletedItem.id)))
        }
        handleMessage(`${person.name} succesfully deleted!`, 'success');
        setTimeout(() => {
            resetMessage();
        }, 5000);
    }

    const personsFiltered = persons.filter(
        item => item.name.toLowerCase().startsWith(search.toLowerCase())
    );

    return (
        <>
            <h2>Phonebook</h2>
            <Message type={msgType} message={message} />
            <Search search={search} onChange={handleSearch} />
            <h2>add new</h2>
            <Form
                onSubmit={addPerson}
                name={newName}
                phone={newNumber}
                onChangeName={handleNewName}
                onChangePhone={handleNewNumber}
            />
            <Numbers persons={personsFiltered} onClick={DeletePerson} />
        </>
    );
};

export default App;
