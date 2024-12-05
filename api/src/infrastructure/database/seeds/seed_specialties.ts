exports.seed = function(knex) {
  return knex('specialties').del()
    .then(function () {
      return knex('specialties').insert([
        { id: 1, name: 'Cardiologia' },
        { id: 2, name: 'Dermatologia' },
        { id: 3, name: 'Neurologia' },
        { id: 4, name: 'Pediatria' },
        { id: 5, name: 'Psiquiatria' },
        { id: 6, name: 'Gastroenterologia' },
        { id: 7, name: 'Ortopedia' },
        { id: 8, name: 'Oftalmologia' },
        { id: 9, name: 'Ginecologia' },
        { id: 10, name: 'Urologia' },
        { id: 11, name: 'Endocrinologia' },
        { id: 12, name: 'Hematologia' },
        { id: 13, name: 'Oncologia' },
        { id: 14, name: 'Nefrologia' },
        { id: 15, name: 'Reumatologia' },
        { id: 16, name: 'Infectologia' },
        { id: 17, name: 'Pneumologia' },
        { id: 18, name: 'Otorrinolaringologia' },
        { id: 19, name: 'Radiologia' },
        { id: 20, name: 'Anestesiologia' },
        { id: 21, name: 'Cirurgia Geral' },
        { id: 22, name: 'Cirurgia Plástica' },
        { id: 23, name: 'Medicina do Trabalho' },
        { id: 24, name: 'Medicina Esportiva' },
        { id: 25, name: 'Geriatria' },
        { id: 26, name: 'Psiquiatria Infantil' },
        { id: 27, name: 'Medicina de Família e Comunidade' },
        { id: 28, name: 'Patologia' },
        { id: 29, name: 'Genética Médica' },
        { id: 30, name: 'Medicina Nuclear' }
      ]);
    });
};
