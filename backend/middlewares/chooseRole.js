const Admin  = require('../controllers/admins');
const Doctor = require('../controllers/doctors');
const Registrar = require('../controllers/registrars');
const Nurse = require('../controllers/nurses');
const Patient = require('../controllers/patients');
const BadAuthError = require('../errors/bad_auth');
const {ERRORS_MESSAGE} = require('../utils/constant')

module.exports.chooseRoleLogin = (req, res, next) => {
  const { role } = req.params
  if (role === 'admin') {
    return Admin.loginAdmin(req, res, next);
  }
  if (role === 'doctor') {
    return Doctor.loginDoctor(req, res, next);
  }
  if (role === 'registrar') {
    return Registrar.loginRegistrar(req, res, next);
  }
  if (role === 'nurse') {
    return Nurse.loginNurse(req, res, next);
  }
  if (role === 'patient') {
    return Patient.loginPatient(req, res, next);
  }
  next(new BadAuthError(ERRORS_MESSAGE.defautl)); // если ни одно условие не подошло, то передаем управление следующему middleware
};

module.exports.chooseRoleLogout = (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') {
    return Admin.logout(req, res, next);
  }
  if (role === 'doctor') {
    return Doctor.logout(req, res, next);
  }
  if (role === 'registrar') {
    return Registrar.logout(req, res, next);
  }
  if (role === 'nurse') {
    return Nurse.logout(req, res, next);
  }
  if (role === 'patient') {
    return Patient.logout(req, res, next);
  }
  next(new BadAuthError(ERRORS_MESSAGE.defautl)); // если ни одно условие не подошло, то передаем управление следующему middleware
};

module.exports.chooseRoleRegister = (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') {
    return Admin.registerAdmin(req, res, next);
  }
  if (role === 'doctor' || role === 'admin') {
    return Doctor.registerDoctor(req, res, next);
  }
  if (role === 'registrar' || role === 'doctor' || role === 'admin') {
    return Registrar.registerRegistrar(req, res, next);
  }
  if (role === 'nurse' || role === 'registrar' || role === 'doctor' || role === 'admin') {
    return Nurse.registerNurse(req, res, next);
  }
  if (role === 'nurse' || role === 'registrar' || role === 'doctor' || role === 'admin') {
    return Patient.registerPatient(req, res, next);
  }
  next(new BadAuthError(ERRORS_MESSAGE.defautl)); // если ни одно условие не подошло, то передаем управление следующему middleware
};

module.exports.chooseRoleInfo = (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') {
    return Admin.getAdmins(req, res, next);
  }
  if (role === 'doctor' || role === 'registrar' || role === 'nurse' || role === 'admin') {
    return Doctor.getDoctors(req, res, next);
  }
  if (role === 'doctor' || role === 'registrar' || role === 'nurse' || role === 'admin') {
    return Registrar.getRegistrars(req, res, next);
  }
  if (role === 'doctor' || role === 'registrar' || role === 'nurse' || role === 'admin') {
    return Nurse.getNurses(req, res, next);
  }
  if (role === 'doctor' || role === 'registrar' || role === 'nurse' || role === 'admin') {
    return Patient.getPatients(req, res, next);
  }
  next(new BadAuthError(ERRORS_MESSAGE.defautl)); // если ни одно условие не подошло, то передаем управление следующему middleware
};

module.exports.chooseRoleInfoOne = (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') {
    return Admin.getAdmin(req, res, next);
  }
  if (role === 'doctor' || role === 'registrar' || role === 'nurse' || role === 'admin') {
    return Doctor.getDoctor(req, res, next);
  }
  if (role === 'doctor' || role === 'registrar' || role === 'nurse' || role === 'admin') {
    return Registrar.getRegistrar(req, res, next);
  }
  if (role === 'doctor' || role === 'registrar' || role === 'nurse' || role === 'admin') {
    return Nurse.getNurse(req, res, next);
  }
  if (role === 'doctor' || role === 'registrar' || role === 'nurse' || role === 'admin' || role === 'patient') {
    return Patient.getPatient(req, res, next);
  }
  next(new BadAuthError(ERRORS_MESSAGE.defautl)); // если ни одно условие не подошло, то передаем управление следующему middleware
};

module.exports.chooseRoleDelete = (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') {
    return Admin.deleteAdmin(req, res, next);
  }
  if (role === 'doctor' || role === 'admin') {
    return Doctor.deleteDoctor(req, res, next);
  }
  if (role === 'registrar' || role === 'doctor' || role === 'admin') {
    return Registrar.deleteRegistrar(req, res, next);
  }
  if (role === 'nurse' || role === 'doctor' || role === 'admin') {
    return Nurse.deleteNurse(req, res, next);
  }
  if (role === 'registrar' || role === 'nurse' || role === 'doctor' || role === 'admin') {
    return Patient.deletePatient(req, res, next);
  }
  next(new BadAuthError(ERRORS_MESSAGE.defautl)); // если ни одно условие не подошло, то передаем управление следующему middleware
};

module.exports.chooseRoleUpdate = (req, res, next) => {
  const { role } = req.user;
  if (role === 'admin') {
    return Admin.updateAdmin(req, res, next);
  }
  if (role === 'doctor' || role === 'admin') {
    return Doctor.updateDoctor(req, res, next);
  }
  if (role === 'registrar' || role === 'admin') {
    return Registrar.updateRegistrar(req, res, next);
  }
  if (role === 'nurse' || role === 'admin') {
    return Nurse.updateNurse(req, res, next);
  }
  if (role === 'doctor' || role === 'registrar' || role === 'nurse' || role === 'admin' || role === 'patient') {
    return Patient.updatePatient(req, res, next);
  }
  next(new BadAuthError(ERRORS_MESSAGE.defautl)); // если ни одно условие не подошло, то передаем управление следующему middleware
};