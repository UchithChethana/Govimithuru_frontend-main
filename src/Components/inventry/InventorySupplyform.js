import React, { useState } from 'react';
import './css/InventorySupplyform.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const predefinedItems = [
  "Tomato Seed","Pumpkin Seed","Cucumber Seed","Carrot Seed","Pepper Seed",

  // Growth Promoters
  "Seaweed extract", "Humic acid", "Amino acid solutions", "Mycorrhizal fungi",
  "Plant hormones (e.g., auxins, gibberellins)", "Rooting powders", "Foliar sprays",
  "Organic compost teas", "Bio-stimulants", "Trichoderma products", "Liquid kelp",
  "Super phosphates", "Worm castings", "Bacterial inoculants", "Organic mulch",
  "Nutrient-dense fertilizers", "Microbial inoculants", "Fish emulsion", 
  "Vitamin B12 supplements", "Organic growth enhancers", "Fermented plant extracts",
  "Plant extracts (e.g., neem oil)", "Aloe vera gel", "Cacao shell mulch",
  "Phosphorus solubilizers", "Biochar", "Compost", "Bone meal", "Nettle tea",
  "Plant probiotics", "Chitosan", "Calcium carbonate", "Magnesium sulfate",
  "Organic insecticides", "Plant sugars", "Silicon supplements", "Cold-pressed oils",
  "Green manures", "Lactobacillus cultures", "Saponins", "Citrus extracts",
  "Garlic extract", "Vinegar-based solutions", "Molasses", "Charcoal", "Herbal teas",
  "Yeast extracts", "Plant protein hydrolysates", "Protein-rich fertilizers",
  "Nutritional enzymes",

  // Remedies
  "Neem oil", "Diatomaceous earth", "Insecticidal soap", "Baking soda fungicide",
  "Garlic spray", "Chili pepper spray", "Epsom salts", "Rubbing alcohol for pests",
  "Boric acid traps", "Copper fungicide", "Hydrogen peroxide", "Citrus oil spray",
  "Vinegar for weeds", "Corn gluten meal", "Essential oils (e.g., peppermint)",
  "Castile soap", "Organic herbicides", "Tea tree oil", "Pyrethrin sprays",
  "Fish oil repellents", "Compost tea for disease control", "Molasses for soil health",
  "Wood ash as fertilizer", "Plant-based repellents", "Soapnut solutions",
  "Essential oil diffusers", "Companion planting strategies", "Pest-resistant plants",
  "Homemade traps", "Fermented plant juices", "Spinosad", "Beneficial nematodes",
  "Lavender oil", "Clove oil", "Bio-pesticides", "Foliar nutrient sprays",
  "Kelp meal for growth", "Citrus peel barriers", "Chopped garlic in soil",
  "Cider vinegar traps", "Baking soda for powdery mildew", "Natural fungicides",
  "Anti-fungal teas", "Herbicidal soap", "Soap nut wash for fruits", 
  "Molasses soil amendments", "Fermented whey", "Aloe vera as a pest repellent",
  "Comfrey leaf extract", "Potato peels for pest control",

  // Organic Farming
  "Organic seeds", "Green manures","Organic mulch", "Companion planting guides", "Organic pest control products", 
  "Permaculture techniques", "Organic soil amendments", "Eco-friendly weed control", 
  "Sustainable irrigation systems", "Biodynamic farming inputs", "Organic compost", 
  "Natural fertilizers", "Seed saving kits", "Organic certification resources", 
  "Native plant seeds", "Wildlife habitats", "Organic herbicides", 
  "Renewable energy sources (e.g., solar)", "Rainwater harvesting systems", 
  "Vertical farming setups", "Organic insect attractants", "Hand tools for organic gardening", 
  "Organic crop insurance", "Community-supported agriculture (CSA)", 
  "Eco-friendly packaging", "Organic gardening workshops", "Soil health testing kits", 
  "Organic food preservation supplies", "Heirloom seeds", "Organic bee supplies", 
  "Organic greenhouse materials", "Cold frames", "Organic hydroponic systems", 
  "Aquaponic supplies", "Organic fertilizers (e.g., fish emulsion)", 
  "Soil testing kits", "Integrated pest management (IPM) guides", 
  "Organic landscaping materials", "Natural planting guides", "Organic livestock feed", 
  "Organic fruit tree care supplies", "Natural dyes from plants", 
  "Organic vegetable growing kits", "Pollinator-friendly plants", 
  "Organic soil testing services", "Educational resources for organic farming", 
  "Organic pest traps", "Organic gardening blogs or magazines",

  // Equipment
  "Hand trowels", "Pruning shears", "Garden forks", "Hoes", "Rakes", "Shovels",
  "Soil testers", "Compost bins", "Seed starting trays", "Sprayers (handheld and backpack)",
  "Drip irrigation kits", "Garden gloves", "Watering cans", "Wheelbarrows", "Cultivators",
  "Greenhouses", "Cold frames", "Garden hoses", "Mulching tools", "Rototillers", 
  "Sickle or scythe", "Plant supports (stakes, cages)", "Soil augers", 
  "Electric or gas-powered tillers", "Pest traps", "Planting guides and templates", 
  "Raised bed kits", "Harvesting baskets", "Grafting tools", "Seeders and planters", 
  "Weeders", "Fertilizer spreaders", "Soil moisture meters", "Shade cloth", 
  "Row covers", "Lawn mowers (manual and electric)", "Insect netting", 
  "Hydroponic systems", "Aquaponic equipment", "Organic pest control sprayers", 
  "Outdoor storage sheds", "Garden carts", "Portable greenhouse kits", 
  "Trimmers (hedge and grass)", "Harvesting knives", "Tarp for collecting leaves", 
  "Protective netting", "Soil sieve", "Water timers", "Compost aerators",

  // Fertilizers
  "Compost", "Manure", "Fish emulsion", "Bone meal", 
  "Blood meal", "Kelp meal", "Worm castings", "Rock phosphate", "Greensand", 
  "Epsom salts", "Alfalfa meal", "Cottonseed meal", "Molasses", "Seaweed extract", 
  "Organic granular fertilizers", "Liquid organic fertilizers", "Organic NPK fertilizers", 
  "Humic acid products", "Micronutrient mixes", "Slow-release organic fertilizers", 
  "Fermented plant juices", "Green manure crops", "Cover crop mixes", 
  "Compost tea", "Organic liquid fertilizers", "Guano (bat or seabird)", 
  "Sulfate of potash", "Organic sulfate fertilizers", "Rock dust", 
  "Organic fish powders", "Diatomaceous earth", "Organic citrus fertilizer", 
  "Organic bloom boosters", "Vegetable garden fertilizers", "Organic fruit tree fertilizers", 
  "Organic nitrogen boosters", "Organic soil amendments", "Foliar feed options", 
  "Organic fertilizers for lawns", "Bone char", "Organic phosphate fertilizers", 
  "Liquid kelp fertilizers", "Microbial fertilizers", "Organic calcium sources", 
  "Organic fertilizers for container plants", "Fertilizer spikes", 
  "Organic fertilizers for hydroponics", "Pelletized organic fertilizers", 
  "Organic sweeteners for soil", "Natural compost additives",

  // Irrigation
  "Drip irrigation kits", "Soaker hoses", "Sprinkler systems", "Garden hoses", 
  "Water timers", "Rain barrels", "Irrigation controllers", "Sprayer attachments", 
  "PVC piping for irrigation", "Hose reels", "Micro-sprinklers", "Automatic drip emitters", 
  "Hose connectors", "Watering cans", "Irrigation stakes", "Pressure regulators", 
  "Surface irrigation systems", "Siphon irrigation setups", "Fogging systems", 
  "Aquaponic water systems", "Hydroponic water pumps", "Landscape irrigation supplies", 
  "Water filters for irrigation", "Garden misting systems", "Floating irrigation systems", 
  "Watering wands", "Irrigation hoses", "Subsurface irrigation systems", 
  "Mulched irrigation setups", "Rain gauges", "Moisture meters", 
  "Water collection barrels", "Landscape fabric for irrigation", "Watering globes", 
  "Irrigation design software", "Leak detection systems", "Bulk water storage tanks", 
  "Drip tape", "Water conservation tools", "Solar-powered irrigation pumps", 
  "Aqueducts for large farms", "Portable irrigation systems", "Irrigation scheduling tools", 
  "Landscape irrigation design services", "Hydroponic nutrient solutions", 
  "Underground irrigation systems", "Water softeners", "Garden spigots", 
  "Gravity-fed irrigation systems", "Timer-controlled sprinkler heads",
];

function InventorySupplyform() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [packetSize, setPacketSize] = useState(1);
  const [unit, setUnit] = useState("kg");
  const [quantityAvailable, setQuantityAvailable] = useState("");
  const [supplyDate, setSupplyDate] = useState("");
  const [mfdDate, setMfdDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  
  const totalPrice = quantityAvailable * unitPrice;

  // Handle item selection from the dropdown
  const handleItemSelect = (item) => {
    setName(item);
    setDescription("Description for " + item); // Replace with appropriate description if available
    // Optionally set other fields based on item properties
  };

  function sendDate(e) {
    e.preventDefault();
    const finalUnit = `${packetSize}${unit}`;
    const formattedName = `${name} (${finalUnit})`;

    const newSupItem = {
      name: formattedName,
      supName: companyName,
      description,
      category,
      unit: finalUnit,
      quantityAvailable: Number(quantityAvailable),
      supplyDate,
      mfdDate,
      expireDate,
      unitPrice: Number(unitPrice),
      totalPrice: totalPrice
    };

    axios.post("https://govimithuru-backend.onrender.com/inventoryitem/add", newSupItem)
      .then(() => {
        toast.success("Item Added");
        resetForm();
      })
      .catch((err) => {
        toast.error("Error adding item: " + err.message);
      });
  }

  const resetForm = () => {
    setName("");
    setCompanyName("");
    setDescription("");
    setCategory("");
    setPacketSize(1);
    setUnit("kg");
    setQuantityAvailable("");
    setSupplyDate("");
    setMfdDate("");
    setExpireDate("");
    setPhoneNumber("");
    setUnitPrice("");
  };

  return (
    <div className="inventory-supply-form-container">
      <h2>Add Supply Item</h2>
      <form className="inventory-supply-form" onSubmit={sendDate}>
        
        <div className="form-group">
          <label htmlFor="itemSelect">Select Item</label>
          <select
            id="itemSelect"
            onChange={(e) => handleItemSelect(e.target.value)}
            value={name}
          >
            <option value="">Select an item...</option>
            {predefinedItems.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            required
            id="companyName"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Seeds">Seeds</option>
            <option value="Growth Promoters">Growth Promoters</option>
            <option value="Remedies">Remedies</option>
            <option value="Organic Farming">Organic Farming</option>
            <option value="EQUIPMENTS">EQUIPMENTS</option>
            <option value="FERTILIZERS">FERTILIZERS</option>
            <option value="IRRIGATION">IRRIGATION</option>
            <option value="Gardening">Gardening</option>
            <option value="Bulk">Bulk</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="packetSize">Packet Size</label>
          <input
            type="number"
            required
            id="packetSize"
            min="1"
            value={packetSize}
            onChange={(e) => setPacketSize(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">L</option>
            <option value="ml">mL</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantityAvailable">Quantity Available</label>
          <input
            type="number"
            required
            id="quantityAvailable"
            placeholder="Enter Quantity Available"
            min="0"
            value={quantityAvailable}
            onChange={(e) => setQuantityAvailable(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="supplyDate">Supply Date</label>
          <input
            required
            type="date"
            id="supplyDate"
            value={supplyDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setSupplyDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mfdDate">Manufacturing Date</label>
          <input
            required
            type="date"
            id="mfdDate"
            value={mfdDate}
            onChange={(e) => setMfdDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expireDate">Expiration Date</label>
          <input
            required
            type="date"
            id="expireDate"
            value={expireDate}
            min={new Date(mfdDate).setDate(new Date(mfdDate).getDate() + 1) ? new Date(mfdDate).toISOString().split('T')[0] : ''}
            onChange={(e) => setExpireDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            required
            placeholder="Enter Phone Number (Max 10 digits)"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                setPhoneNumber(value);
              }
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="unitPrice">Unit Price</label>
          <input
            type="number"
            required
            id="unitPrice"
            placeholder="Enter Unit Price"
            min="0"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Total Price</label>
          <input
            type="text"
            readOnly
            value={`$${totalPrice.toFixed(2)}`} 
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="add-button">Add</button>
          <button type="button" className="cancel-button" onClick={() => window.location.reload()}>Cancel</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default InventorySupplyform;
