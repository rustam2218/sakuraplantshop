function PlantCard({plant}){
  return (
    <div className="plant-card">
      <img src={plant.image || '/placeholder.png'} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>{plant.price}</p>
      <button>Подробнее</button>
    </div>
  );
}
export default PlantCard;
