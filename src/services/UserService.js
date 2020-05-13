const model = require("../models/User");

module.exports.doLogin = (username, password, res) => {
  return model.find({
  
    }).then(docs => {
      return docs;
    })
    .catch(e => {
      throw e;
    });
};
module.exports.getUserinfo = (username, password) => {
  return model
    .find({
      username,
      password
    }).then(docs => {
      return docs;
    })
    .catch(e => {
      throw e;
    });
};
module.exports.userinfoUpdate = (username, formObj) => {
  return model
    .findOneAndUpdate({
      username: username
    }, {
      $set: formObj
    }, {
      new: true
    })
    .catch(e => {
      throw e;
    });
};

module.exports.userinfoRegister = (userObj) => {
  return model
    .create(userObj)
    .catch(e => {
      throw e;
    });
};
module.exports.checkUsername = (username) => {
  return model
    .findOne({
      username
    })
    .catch(e => {
      throw e;
    });
};
module.exports.getFeatures = (ownerId, datasetId) => {
  return model
    .findOne({
      owner: ownerId,
      _id: datasetId,
      isDeleted: false
    })
    .catch(e => {
      throw e;
    });
};
module.exports.getStudio = (ownerId, datasetId) => {
  return model
    .findOne({
      owner: ownerId,
      _id: datasetId,
      isDeleted: false
    })
    .catch(e => {
      throw e;
    });
};
module.exports.datasetFindFeatures = (ownerId, datasetId) => {
  return model
    .findOne({
      owner: ownerId,
      _id: datasetId,
      isDeleted: false
    })
    .catch(e => {
      throw e;
    });
};
module.exports.datasetUpdateFeatures = (datasetId, featuresObj) => {
  return model
    .findOneAndUpdate({
      _id: datasetId,
      isDeleted: false
    }, {
      $set: featuresObj
    }, {
      new: true
    })
    .catch(e => {
      throw e;
    });
};

module.exports.datasetUpdateSetPatch = (ownerId, datasetId, body) => {
  return model
    .findOneAndUpdate({
      owner: ownerId,
      _id: datasetId,
      isDeleted: false
    }, {
      $set: body
    }, {
      new: true
    })
    .catch(e => {
      throw e;
    });
};
module.exports.datasetFindSetPatch = datasetId => {
  return model
    .findOne({
      owner: ownerId,
      _id: datasetId,
      isDeleted: false
    })
    .catch(e => {
      throw e;
    });
};


module.exports.datasetDestory = datasetId => {
  return model.remove({
    _id: datasetId,
    isDeleted: false
  }).catch(e => {
    throw e;
  });
};

// module.exports.delet = (id) => {
//     return model.destroy({
//         where: {
//             id
//         }
//     })
// }

// module.exports.getAll = (rest, order, offset, limit) => {
//     return model.findAll({
//         offset,
//         limit,
//         where: rest,
//         order
//     })
// }