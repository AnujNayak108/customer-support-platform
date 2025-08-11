import { Request, Response } from 'express';
import Message from '../models/Message';
import { getIo } from '../socket';

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { content, sender, receiver } = req.body;
    const message = new Message({
      content,
      sender,
      receiver
    });
    const savedMessage = await message.save();

    // Emit to a deterministic room (conversation between two participants)
    const roomA = `${sender}:${receiver}`;
    const roomB = `${receiver}:${sender}`;
    try {
      getIo().to(roomA).to(roomB).emit('message:new', savedMessage);
    } catch {}

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating message', error });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { sender, receiver } = req.query;
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error marking message as read', error });
  }
}; 