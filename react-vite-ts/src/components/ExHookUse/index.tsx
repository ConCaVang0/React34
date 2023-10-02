import React, { useState } from "react";


const courses = [
  {
    id: 1,
    name: "Javascript"
  },
  {
    id: 2,
    name: "ReactJS"
  },
  {
    id: 3,
    name: "Java"
  }
];

const gifts = ["LAPTOP", "Iphone", "KeyBoard"];

function CheckBox() {
  const [gift, setGift] = useState("");
  const [checked, setChecked] = useState([1]);
  const [check, setCheck] = useState(1);

  const handleSubmit = () => {
    console.log({
      id: checked
    });
  };

  const handleCheck = (id:number) => {
    const isChecked = checked.includes(id);
    if (isChecked) {
      setChecked((checked) => checked.filter((check) => check !== id));
    } else {
      setChecked((prev) => [...prev, id]);
    }
  };

  const handleUpdate = () => {
    const index = Math.floor(Math.random() * gifts.length);
    setGift(gifts[index]);
  };

  return (
    <div className="checkbox" style={{ padding: 32 }}>
      <h1>Checkbox courses</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <input
            type="checkbox"
            onChange={() => handleCheck(course.id)}
            checked={checked.includes(course.id)}
          />
          {course.name}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>

      <div className="random">
        <h1>Random Gifts</h1>
        <div>{gift || "Chưa có phần thưởng"}</div>
        <button style={{ marginTop: 20 }} onClick={handleUpdate}>
          Update
        </button>
      </div>

      <div className="radio" style={{ marginTop: 50 }}>
        {courses.map((course) => (
          <div key={course.id}>
            <input
              checked={check === course.id}
              type="radio"
              onChange={() => setCheck(course.id)}
            />
            {course.name}
          </div>
        ))}
      </div>
    </div>
  );
}


export default CheckBox;