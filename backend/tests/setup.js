/**
 * Setup global para Jest — silencia logs de Sequelize y Morgan durante los tests.
 */
process.env.NODE_ENV  = 'test';
process.env.JWT_SECRET = 'test_secret_jwt_unsch_2026';

// Suprimir console.log/error en tests (descomenta si quieres verlos)
// global.console.log  = jest.fn();
// global.console.error = jest.fn();
