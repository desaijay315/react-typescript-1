// Simulated API response
export const fetchData = async () => {
    return Promise.resolve([
      { ticker: "ALPHA", price: 100, assetClass: "Credit" },
      { ticker: "BETA", price: 200, assetClass: "Equities" },
      { ticker: "ETA", price: 150, assetClass: "Macro" }
    ]);
  };
  