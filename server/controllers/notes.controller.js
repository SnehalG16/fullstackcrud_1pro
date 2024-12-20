const notemodel = require("../models/notes.model");

const notesCreate=async(req,res) => {
    const {title,body}=req.body

    if (!title || !body) {
        return res.status(400).send({ message: "Please fill all fields" });
    } 
    try {

        await notemodel.create({title,body,userid:req.user._id})
        res.status(200).send({ message: "Note Created Successfully" });
    } catch (error) {
        response.status(400).send({ message: "error"});
    }
}

const notesDelete=async(req,res)=>{
    const {notesId}=req.params
    const isexitnote=await notemodel.findById(notesId);
    if (!isexitnote) {
      return res.status(400).json({message:"notes not exit"})
    }
    
    if (isexitnote.userid != req.user._id) {
        return res
          .status(400)
          .json({ message: "You do not have permission to delete notes" });
      }
      
      await notemodel.findByIdAndDelete(notesId);
      
      res.status(200).json({ message: "Notes deleted successfully" });
      
      const GetAllNotesByUser = async (req, res) => {
        const { userId } = req.params;
        try {
          if (userId != req.user._id) {
            return res
              .status(403)
              .json({ message: "You don't have permission to view this" });
          }
      
          const allusernotes = await Notesmodel.find({ userId: userId });
      
          if (allusernotes.length == 0) {
            return res.status(404).json({ message: "No notes found" });
          }
      
          res.status(200).json({ allusernotes });
        } catch (error) {
          res.status(400).json({ message: error });
        }
      };
    }  

    const GetSingleNotesByUser = async (req, res) => {
        const { notesId } = req.params;
        try {
          const isExistNotes = await notemodel.findById(notesId);
      
          if (!isExistNotes) {
            return res.status(404).json({ message: "Notes not found" });
          }
      
          if (isExistNotes.userId !== req.user._id) {
            return res
              .status(403)
              .json({ message: "You don't have permission to delete this" });
          }
          res.status(200).json({ notes: isExistNotes });
        } catch (error) {
          res.status(400).json({ message: error });
        }
      };
      
      module.exports = { notesCreate, notesDelete, GetAllNotesByUser, GetSingleNotesByUser };