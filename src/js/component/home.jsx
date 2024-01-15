import React, { useEffect, useState } from "react";


// Create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			
			let body= todos.concat([{"label": inputValue, "done": false}])
			
			fetch('https://playground.4geeks.com/apis/fake/todos/user/alexfazakas', {
		  method: "PUT",
		  body : JSON.stringify(body),
		  headers: {
			"Content-Type": "application/json"
		  }
		})
		.then(resp => {
			if (!resp.ok) throw Error(`La response no es ok`)
			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			setTodos(body);
			setInputValue("");
		})
		.catch(error => {
			//manejo de errores
			alert(`Ha habido un error, intentalo mas tarde`)
			console.log(error);
		});
		}

			
	

	};

	const handleDelete = (index) => {
		const updatedTodos = todos.filter((_, i) => i !== index);
		

		
			
			fetch('https://playground.4geeks.com/apis/fake/todos/user/alexfazakas', {
		  method: "PUT",
		  body : JSON.stringify(updatedTodos),
		  headers: {
			"Content-Type": "application/json"
		  }
		})
		.then(resp => {
			if (!resp.ok) throw Error(`La response no es ok`)
			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			setTodos(updatedTodos);
			
		})
		.catch(error => {
			//manejo de errores
			alert(`Ha habido un error, intentalo mas tarde`)
			console.log(error);
		});
	};

	useEffect(()=> {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/alexfazakas', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        if (!resp.ok) throw Error(`La response no es ok`)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        setTodos(data)
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
		alert(`Ha habido un error, intentalo mas tarde`)
        console.log(error);
    });
	}, [])

	return (
		<div className="container mt-5">
			<h1>My Todos List</h1>
			<ul>
				<li>
					<input
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
						placeholder="Que tengo que hacer?"
					/>
				</li>
				{todos.map((item, index) => (
					<li key={index}>
						{item.label}{" "}
						<i
							className="fas fa-trash-alt"
							onClick={() => handleDelete(index)}
						></i>
					</li>
				))}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	);
};

export default Home;
