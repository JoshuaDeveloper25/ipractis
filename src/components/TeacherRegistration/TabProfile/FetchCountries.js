export const FetchCountries = async () => {
  const url = "https://restcountries.com/v3.1/all";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json.map((country) => ({
      name: country.name.common,
      flag: country.flags.png,
    }));
  } catch (error) {
    console.error(error);
  }
};
