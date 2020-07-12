import React from "react";

export const CharacterItem = ({ item }) => {
  let imgPath = JSON.stringify(item.thumbnail.path);
  imgPath = imgPath.replace(/"/g, "");
  let imgFormat = JSON.stringify(item.thumbnail.extension);
  imgFormat = imgFormat.replace(/"/g, "");
  let imageUrl = `${imgPath}/standard_xlarge.${imgFormat}`;

  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <img src={imageUrl} alt="" />
        </div>
        <div className="card-back">
          <h1>{item.name}</h1>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;
