import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const RanksStar = () => {
  const [currentSelected, setCurrentSelected] = React.useState(0);
  const stars = [1, 2, 3, 4, 5];
  const starTexts = ['Tệ', 'Ổn', 'Tạm', 'Tốt', 'Rất tốt'];

  const handleClickStar = (star: number) => {
    setCurrentSelected(star);
  };

  return (
    <div className="flex">
      {stars.map((star) => (
        <div
          key={star}
          onClick={() => handleClickStar(star)}
          className={`cursor-pointer ${
            star <= currentSelected ? 'text-yellow-500' : ''
          }`}
        >
          {star <= currentSelected ? <AiFillStar /> : <AiOutlineStar />}
        </div>
      ))}
      <div className="ml-2">{starTexts[currentSelected - 1]}</div>
    </div>
  );
};

export default RanksStar;

// import React from 'react';
// import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

// const RanksStar = () => {
//   const [currentSelected, setCurrentSelected] = React.useState(0);
//   const stars = [1, 2, 3, 4, 5];

//   const handleClickStar = (star: number) => {
//     setCurrentSelected((prevState) => (prevState === star ? 0 : star));
//   };

//   return (
//     <div className="flex">
//       {stars.map((star) => (
//         <div
//           key={star}
//           onClick={() => handleClickStar(star)}
//           className={star <= currentSelected ? 'text-yellow-500' : ''}
//         >
//           {star <= currentSelected ? <AiFillStar /> : <AiOutlineStar />}
//         </div>
//       ))}
//     </div>
//   );
// };
