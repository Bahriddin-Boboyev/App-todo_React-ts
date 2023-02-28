import { ChangeEvent, TouchEvent, useState } from "react";
import style from "./style.module.css";
import { IData } from "../interfaces";
import { data } from "../constants";

export const Header = (): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [save, setSave] = useState<string>("");
  const [arr, setArr] = useState<IData[]>(data);
  const [ifalse, setIfalse] = useState<boolean>(true);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>): void => {
    setTitle(evt.target.value);
  };

  const submitHandler = (): void => {
    if (!title?.length) return;
    const newData = {
      title: title,
      id: new Date().getTime(),
      description: "description",
    };
    setTitle("");
    setArr([...arr, newData]);
  };

  const delItem = (id: number): void => {
    setArr([...arr.filter((item) => item.id !== id)]);
  };

  const saveChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setSave(e.target.value);
  };

  const editHandler = (id: number): void => {
    setIfalse(false);
    setEditingItemId(id);
  };

  const saveSubmitHandler = (id: number): void => {
    const editedItem = arr.find((item) => item.id === id);
    if (editedItem && save.length > 0) {
      editedItem.title = save;
      setArr([...arr]);
    }
    setSave("");
    setEditingItemId(null);
  };

  const cancelHandler = (): void => {
    setEditingItemId(null);
    setSave("");
  };

 

  return (
    <div className={style.container}>
      <div className={style.todo}>
        <h1 className={style.title}>App Todo</h1>
        <div className={style.block}>
          <input
            placeholder="Enter Todo"
            className={style.input}
            value={title}
            onChange={changeHandler}
          />
          <button onClick={submitHandler} className={style.button}>
            Add Todo
          </button>
        </div>
        <div className={style.card_box}>
          {arr.map((item) => (
            <div key={item.id} className={style.card_inner_box}>
              <p>
                name: <span>{item.title}</span>
              </p>
              <div className={style.btn_blocks}>
                <button
                  className={style.edit_btn}
                  onClick={() => editHandler(item.id)}
                >
                  Edit
                </button>
                <button
                  className={style.del_btn}
                  onClick={() => delItem(item.id)}
                >
                  Delete
                </button>
              </div>

              <div
                className={`${style.modal} ${
                  editingItemId !== item.id ? style.none : ""
                }`}
              >
                <div className={style.modal_box}>
                  <input
                    placeholder="enter your name"
                    value={save}
                    onChange={saveChangeHandler}
                  />
                  <button
                    onClick={() => saveSubmitHandler(item.id)}
                    className={style.save_btn}
                  >
                    Save
                  </button>
                  <button
                    className={style.cancel_btn}
                    onClick={() => cancelHandler()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
