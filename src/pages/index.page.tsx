import { gql } from "@apollo/client";
import type { VFC } from "react";
import { useState } from "react";
import type { TodoFragment } from "src/apollo/graphql";
import { useUpdateTodoMutation } from "src/apollo/graphql";
import { useAddTodoMutation } from "src/apollo/graphql";
import { useGetUserQuery } from "src/apollo/graphql";

type TodoType = {
  todo: TodoFragment;
};

const Todo: VFC<TodoType> = ({ todo }) => {
  const [title, setTitle] = useState<string>("");
  const [updateTodo] = useUpdateTodoMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleClick = () => {
    updateTodo({ variables: { id: todo.id, title: title } });
    setTitle("");
  };
  return (
    <div>
      <span>タイトル：{todo.title}、</span>
      <span>作成日:{todo.created_at.substring(0, 10)}、</span>
      <input
        value={title}
        onChange={handleChange}
        className="border-black border"
      />
      <button onClick={handleClick} className="bg-blue-500 p-1 ml-1">
        編集
      </button>
    </div>
  );
};

const Home = () => {
  const [todo, setTodo] = useState<string>("");
  const { data } = useGetUserQuery({ variables: { id: 1 } });
  const [addTodo] = useAddTodoMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const handleClick = () => {
    addTodo({ variables: { user_id: 1, title: todo } });
    setTodo("");
  };
  return (
    <div className="mt-4 ml-4">
      <div>
        <p>user name：{data?.users_by_pk?.name}</p>
      </div>
      <div className="mt-4">
        <span>AddTodo：</span>
        <input
          value={todo}
          onChange={handleChange}
          className="border-black border"
        />
        <button onClick={handleClick} className="bg-blue-500 p-1 ml-1">
          追加
        </button>
      </div>
      <div className="mt-4">
        <p>TodoList：</p>
        <ul>
          {data?.users_by_pk?.todos.map((todo) => {
            return (
              <li key={todo.id} className="mt-2">
                <Todo todo={todo} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;

gql`
  query GetUser($id: Int!) {
    users_by_pk(id: $id) {
      id
      name
      todos {
        id
        title
        created_at
        updated_at
      }
    }
  }
`;
gql`
  mutation AddTodo($user_id: Int!, $title: String!) {
    insert_todos_one(object: { title: $title, user_id: $user_id }) {
      ...Todo
    }
  }

  mutation UpdateTodo($id: Int!, $title: String!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
      ...Todo
    }
  }
`;
gql`
  fragment Todo on todos {
    id
    title
    created_at
    updated_at
  }
`;
