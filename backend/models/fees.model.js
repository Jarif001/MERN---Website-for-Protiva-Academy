import mongoose from "mongoose";

const feesSchema = new mongoose.Schema(
  {
    sortId:{
      type: Number,
      required: true,
      unique: true,
    },
    type:{
      type: String,
      required: true,
    },
    fee:{
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Fees = mongoose.model("Fee", feesSchema);
export default Fees;
