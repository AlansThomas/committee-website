const GroupSchema = require('../models/Groups.Model.js')
const UserSchema = require('../models/User.Model.js')
const joi = require('@hapi/joi')
const logger = require('../utils/logger.utils')
const UserTable = require('../models/User.Model.js')
const dotenv = require('dotenv');
const { validationResult } = require("express-validator");
dotenv.config();
const Image_Path = process.env.Image_Path
const TotalPoint = require('../models/TotalPoint.Model.js')
const mongoose = require('mongoose');
const GroupsModel = require('../models/Groups.Model.js');
const { log } = require('../utils/logger.utils')
const Schema = joi.object().keys({
    GroupName: joi.string().max(30).required(),
    GroupType: joi.string().max(30)
})

const schemaforparams = joi.object().keys({
    id: joi.string().alphanum()
})


exports.updateProfileImage = async (req, res) => {
    try {

        const ImagePath = Image_Path + req.files[0].filename

        await GroupsModel.updateOne({ _id: req.params.id },
            { $set: { GroupImage: ImagePath } },).then((data) => {
                res.status(200).send(data)
            }).catch((error) => {
                logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(400).send(error)
            })
    } catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }
}

exports.uploadFiles = async (req, res) => {
    try {
        const Validation = await Schema.validate(req.body);

        const group = await GroupsModel.findOne({ GroupName: req.body.GroupName?.toLowerCase(), Delete: 0 }).exec()

        if (group?.GroupName.toLowerCase() == req.body.GroupName.toLowerCase()) {
            return res.status(401).json({
                Success: 0,
                Message: 'group name already exists'
            })
        }

        if (!Validation.error) {


            req.body.GroupImage = Image_Path + req.files[0].filename

            const SaveGroup = new GroupSchema(req.body)

            SaveGroup.save().then((data) => {
                res.status(200).send(data)
            }).catch((err) => {
                logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

                res.status(400).send(err)

            })
        }
        else {
            res.status(400).send(Validation.error)
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
}




exports.updatesingleuser = (req, res) => {

    UserSchema.findByIdAndUpdate(req.params.id, { $set: req.body }).then((data) => {
        res.status(200).send(data)

    }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
    })

}


exports.UpdateGroupOfAllUsers = async (req, res) => {
    const ObjJson = req.body
    const GroupID = req.params.id
    try {
        const cd = new Date();
        const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

        for (const element of ObjJson) {
            await UserSchema.findOneAndUpdate(
                { _id: element },
                { $set: { GroupId: GroupID, GroupCreateDate: str, GroupIdObj: GroupID } }
            ).exec();
        }
        res.status(200).send("saved")
    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(error)
    }
}

exports.UpdateCommitteeOfAllUsers = async (req, res) => {
    const ObjJson = req.body
    const CommitteeId = req.params.id
    try {
        const cd = new Date();
        const str = cd.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

        for (const element of ObjJson) {
            await UserSchema.findOneAndUpdate(
                { _id: element },
                { $set: { CommitteeId: CommitteeId, Type: 1, TypeSearch: "Committee", CommitteCreateDate: str, GroupRole: 0 } }
            ).exec();
        }
        res.status(200).send("saved")
    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(error)
    }
}


exports.FindAllCommittee = (req, res) => {
    GroupSchema.find(req.body).then((data) => {
        res.status(200).send(data)
    }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).json(error)
    })
}

exports.FindAllGroups = (req, res) => {
    GroupSchema.find({ $and: [{ GroupType: "0" }, { Delete: 0 }] }).sort({ "createdAt": -1 }).then((data) => {
        res.status(200).send(data)
    }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        res.status(403).json(error)
    })
}

exports.findCommity = (req, res) => {
    UserTable.find({ Type: { $eq: 1 } }).then((data) => {
        res.status(200).send(data)
    }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(403).json(error)
    })
}

exports.findGroupById = (req, res) => {
    try {
        GroupSchema.findById(req.params.id).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(403).send("id not correct")
        });
    } catch (error) {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        res.status(401).send(error)


    }
}
exports.FindUsersOfAGroup = (req, res) => {
    UserSchema.find({ $and: [{ GroupId: req.params.id }, { Delete: 0 }] }, { UserName: true, Email: true, Type: true, DOB: true, GroupRole: true, Designation: true }).sort({ "updatedAt": -1 }).then((data) => {
        res.status(200).send(data)
    }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        res.status(400).json(error)
    })

}
exports.FindGroupName = (req, res) => {
    UserSchema.find({ $and: [{ GroupName: req.params.gname }, { Delete: 0 }] }).then((data) => {
        res.status(403).json({ "error": "user exist" })
    }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

        res.status(401).send(error)
    })

}
exports.FindGroupNameForInnovature = (req, res) => {
    UserSchema.find({ $and: [{ GroupName: req.params.gname }, { Delete: 0 }] }).then((data) => {
        if (data != null) {
            res.status(200).JSON(data)
        }
        else {
            res.status(403).JSON("not found")
        }
    }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(error)
    })

}

exports.FindUsersOfACommitteeDelete = (req, res) => {
    async function groupUpdation(request) {
        GroupSchema.findByIdAndUpdate(request.params.id, { $set: { Delete: 1 } }).then(() => {
            TotalPoint.deleteMany({ "GroupId": request.params.id }).then((data) => {
                res.status(200).send(data)
            }).catch((error) => {
                res.status(400).send(error)

            })
        })
    }
    const group = () => {
        UserSchema.find({ CommitteeId: req.params.id }).select('id').then((response) => {
            if (response) {
                UserSchema.updateMany({ _id: { $in: response } },
                    { $set: [{ CommitteeId: 0 }, { Type: 0 }] }).catch((err) => {
                        logger.error(`${err} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    })
            }

        })
        groupUpdation(req)
    }
    const committee = () => {
        UserSchema.find({ GroupId: req.params.id }).select('id').then((response) => {
            if (response) {
                UserSchema.updateMany({ _id: { $in: response } },
                    { $set: { GroupId: 0, GroupRole: 0, GroupIdObj: null } }).catch((err) => {
                        res.send(err)
                    })
            }

        })
        groupUpdation(req)
    }
    GroupSchema.findById(req.params.id).then((data) => {
        if (data.GroupType == 1) {
            group();
        }
        else {
            committee();
        }
    })

}

exports.FindUsersOfACommittee = (req, res) => {

    UserSchema.find({ $and: [{ CommitteeId: req.params.id }, { Delete: 0 }] }, { UserName: true, Email: true, Type: true, DOB: true, GroupRole: true, Designation: true }).sort({ "updatedAt": -1 }).then((data) => {
        res.status(200).send(data)
    }).catch((error) => {
        logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).json(error)
    })
}

exports.updateGroupDetails = async (req, res) => {


    let Validation = Schema.validate(req.body)
    if (!Validation.error) {
        const group = await GroupSchema.findOne(req.body).exec()
        if (group&&req.params.id!=group?._id?.valueOf()) {
            return res.status(400).send({errCode:801,errMsg:"Please select a unique group name"})
        }
        await GroupSchema.findByIdAndUpdate(req.params.id, { $set: req.body }).then((data) => {
            return res.status(200).send(data)
        }).catch((err) => {
            res.status(400).send(err)
        })

    }
    else {
        res.status(400).send(Validation.error.details[0].message)
    }

}

exports.GroupDelete = async (req, res) => {

    try {
        const groupDeleteFun = async () => {
            await GroupSchema.findByIdAndDelete(req.params.id).then(() => {
                TotalPoint.deleteMany({ "GroupId": req.params.id }).then((data) => {
                    res.status(200).send(data)
                }).catch((error) => {
                    logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    res.status(400).json(error)
                })
            }).catch((err) => {
                return res.status(400).send(err)
            })
        }

        if (req.body) {

            await groupDeleteFun();
        }
        else {
            res.status(400).send("error")
        }
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e)
    }
}



exports.groupNameAndMembers = async (req, res) => {
    try {
        let allset = []
        const users = await UserSchema.findById(req.User._id).exec()
        const groupId = new mongoose.Types.ObjectId(users.GroupId);

       await GroupSchema.findById(groupId).then(async(data) => {

            allset.push(data);
          await  UserSchema.find({ GroupId: groupId, Delete: 0 }, { UserName: true, Email: true, Type: true, DOB: true, GroupRole: true, UserImage: true }).then((user) => {

            allset.push(...user);

                res.status(200).send(allset);
            }).catch((err) => {
                logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(400).send(err)
            })

        }).catch((error) => {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).send(error)
        })
    }
    catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(401).send(e)
    }
}

exports.findGroupOnEventdsOnly = (async (req, res) => {
    const REventId = req.params.id
    try {
        await TotalPoint.aggregate([
            { $match: { EventId: new mongoose.Types.ObjectId(REventId) } },
            {
                $group: {
                    _id: {

                        "GroupId": "$GroupId"
                    }
                }
            },
            {
                $lookup: {
                    from: "groups", localField: "_id.GroupId", foreignField: "_id", as: "grouplist"
                }
            }
        ]).then(async (response) => {
            res.status(200).send(response)
        }).catch((error) => {
            logger.error(`${error.status || 500} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(401).send(error)
        })

    } catch (e) {
        logger.error(`${e.status || 500} - 'error' - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(400).send(e)
    }

})

exports.FindUsersOfAGroupWithoutCommitteeMember = (req, res) => {
    let Validation = schemaforparams.validate(req.params)
    if (!Validation.error) {
        UserSchema.find({ $and: [{ GroupId: req.params.id }, { Delete: 0 }, { CommitteeId: 0 }] }, { UserName: true, Email: true, Type: true, DOB: true, GroupRole: true }).sort({ "GroupRole": -1 }).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            logger.error(`${err.status || 500} - 'error' - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(400).json(err)
        })
    }
    else {
        res.status(400).send(Validation.error)
    }

}


