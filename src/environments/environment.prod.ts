export const environment = {
  production: true,
  //routers
  appRoutes: {
    login: '',
    overview: 'overview',
    batches: 'batches',
    locations: 'locations',
    curricula: 'curricula',
    trainers: 'trainers',
    profile: 'profile',
    reports: 'reports',
    settings: 'settings',
    callback: 'callback'
  },

  security_config: {
    roles: ['SVP of Technology', 'Trainer'],
    groups: ['Operations'],
    permissions: []
  },

  auth0: {
    namespace: 'https://revature.com/',
    title: 'AssignForce Login',
    clientId: 'tjQhcs0O4mRV2iry6SAO0Gy1YQcBrWCa', //hydra
    domain: 'revature.auth0.com',
    responseType: 'token id_token',
    audience: 'hydra-gateway',
    redirectUri: 'https://assignforce.cfapps.io/callback',
    scope: 'openid profile'
  },

  apiUrls: {
    batchController: {
      baseUrl: 'https://hydra.cfapps.io/api/batch',
      createBatch: '/all/batch/create',
      deleteBatch: '/all/batch/delete/',
      updateBatch: '/all/batch/update',
      findCommonLocations: '/all/locations',
      getAllBatches: '/qc/batch/all',
      findAllBatchesByTrainer: '/trainer/batch/all',
      createWeek: '/trainer/week/new/',
      getAllVpBatches: '/vp/batch/all',
      getAllCurrentBatches: '/vp/batch/all/current'
    },

    addressController: {
      baseUrl: 'https://hydra.cfapps.io/api/address',
      createLocation: '/vp/location/create',
      updateLocation: '/vp/location/update',
      getAllLocations: '/all/location/all',
      getLocation: '',
      removeLocation: '/vp/location/delete',
      reactivateLocation: '/vp/location/reactivate'
    },

    buildingController: {
      baseUrl: 'https://hydra.cfapps.io/api/address/building',
      createBuilding: '',
      retrieveBuilding: '/',
      updateBuilding: '',
      deleteBuilding: '/',
      retrieveAllBuildings: ''
    },

    locationController: {
      baseUrl: 'https://hydra.cfapps.io/api/address/location',
      createLocation: '',
      retrieveLocation: '/',
      updateLocation: '',
      deleteLocation: '/',
      retrieveAllLocation: ''
    },

    curriculumController: {
      baseUrl: 'https://hydra.cfapps.io/api/curriculum',
      createCurriculum: '',
      retrieveCurriculum: '/',
      updateCurriculum: '',
      deleteCurriculum: '/',
      retrieveAllCurricula: '',
      retrieveAllActiveCurricula: '/active',
      retrieveAllCore: '/core',
      retrieveAllActiveCore: '/activeCore',
      retrieveAllFocus: '/focus',
      retrieveAllActiveFocus: '/activeFocus'
    },

    settingController: {
      baseUrl: 'https://hydra.cfapps.io/api/setting',
      createSetting: '',
      retrieveSetting: '/',
      getGlobalSetting: '',
      updateSetting: '',
      deleteSetting: '/'
    },

    skillController: {
      baseUrl: 'https://hydra.cfapps.io/api/skill',
      findAllActive: '/skill/all',
      findAll: '/vp/skill',
      findSkillById: '/skill/',
      updateSkillCaliber: '/vp/skill/update',
      saveSkill: '/vp/skill',
      createSkill: '/api/v2/skill',
      retrieveSkill: '/api/v2/skill/',
      updateSkillMinerva: '/api/v2/skill',
      deleteSkill: '/api/v2/skill/',
      retrieveAllSkills: '/api/v2/skill',
      retrieveSkillsByIds: '/api/v2/skill/ids'
    },

    trainerController: {
      baseUrl: 'https://hydra.cfapps.io/api/trainer',
      createTrainer: '/vp/trainer/create',
      updateTrainer: '/vp/trainer/update',
      findTrainer: '/training/trainer/byemail/',
      makeInactive: '/vp/trainer/delete/',
      getAllTrainersTitles: '/vp/trainer/titles',
      getAllTrainers: '/all/trainer/all'
    },

    unavailableController: {
      baseUrl: 'https://hydra.cfapps.io/api/unavailable',
      createUnavailability: '',
      retrieveUnavailability: '/',
      deleteUnavailability: '/',
      retrieveAllUnavailabilities: ''
    }
  },

  //base url
  baseUrl: 'https://assignforce.cfapps.io'
};