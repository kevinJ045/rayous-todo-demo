import { Component, InputWrapper, Text, List, ListItem, Widget, Button, Checkbox } from "rayous";
import * as Extra from "rayous/extra";
import { TodoListLocalStorage } from "../data/controllers/localStorage";
import { Todo } from "../data/models/todo";
import "../styles/main.scss";

export default class extends Component {
	todos: TodoListLocalStorage = new TodoListLocalStorage();

	build({ route: {} }) {
		const self = this;
		let todoTitle = new Extra.EntryController('');
		return new Widget({
			class: 'main',
			children: [
				new Widget({
					class: 'addbar',
					children: [
						new InputWrapper({
							title: 'Enter Todo',
							controller: todoTitle,
							onTextInput(){}
						}),
						new Button('Add', {
							onClick(){
								self.todos.add(new Todo({ title: todoTitle.get() }));
							}
						})
					]
				}),
				new List({
					items: this.todos,
					template(todo: Todo, index: number){
						return new ListItem({ 
							children: [ 
								new Checkbox({
									checked: todo.checked,
									onChange(){
										const that: any = this;
										self.todos.setItem(todo, { checked: that.isChecked()  })
									}
								}),
								new Text(todo.title, {
									style: { textDecoration: todo.checked ? 'line-through' : '' }
								}),
								new Button('x', { onClick(){ self.todos.remove(todo) } })
							]
						});
					}
				}),
			]
		});
	}
}