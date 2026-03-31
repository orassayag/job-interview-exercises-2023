class ProviderModel {
  constructor({
    name,
    specialties,
    availableDates,
    score,
  }) {
    this.name = name;
    this.specialties = specialties;
    this.availableDates = availableDates;
    this.score = score;
  }
}

export default ProviderModel;
