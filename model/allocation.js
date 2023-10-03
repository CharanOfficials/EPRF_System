import mongoose from "mongoose";
const allocationSchema = mongoose.Schema({
    allocatee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    allocater: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    allocated: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user'
    }]
}, {
    timestamps:true
})
const Allocation = mongoose.model('allocation', allocationSchema)
export default Allocation