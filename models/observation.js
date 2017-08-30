var mongoose = require('mongoose')
var schema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // station approach
  'freeFromUndueInfluence': Boolean,
  'hadDefacedOrDamagedNotices': Boolean,
  'wasEasyToFind': Boolean,
  'wasAccessibleToWheelchairs': Boolean,
  'wasFreeFromHazards': Boolean,
  'hadQueues': Boolean,
  'hadOrderlyQueues': Boolean,
  'hadParking': Boolean,
  'hadDisabledParking': Boolean,
  'hadTellers': Boolean,
  'hadTellersFrom': Array,

  // station entry
  'ingress': String, // Time
  'egress': String, // Time

  'card-check': Array,

  // polling procedure
  'sawElectors': Boolean,
  'name-and-address': String,
  'crossing-register': String,
  'distributing-ballot': String,
  'prefolding-ballot': String,
  'uim': String,
  'secrecy': String,

  // polling place
  'hadSeatsAvailable': Boolean,
  hadPrivateBooths: Boolean,
  hadPencils: Boolean,
  hadLowLevelBooth: Boolean,
  hadCctv: Boolean,
  hadCctvThatUndermines: Boolean,
  wasWellLit: Boolean,
  hadNotices: Boolean,
  hadGuidanceToVoters: Boolean,
  hadInstructionsToVoters: Boolean,
  hadSealedBoxes: Boolean,
  hadPostalBallotsHandedIn: Boolean,
  wereWearingNeutralColours: Boolean,
  hadNonElectors: Boolean,
  hadNonElectorsType: Array,

  // verdicts
  upheldSuffrage: Boolean,
  upheldIntegrity: Boolean,
  comments: String
})

module.exports = mongoose.model('Observation', schema)
