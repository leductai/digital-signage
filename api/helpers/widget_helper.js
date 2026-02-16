const Display = require('../models/Display');
const CommonHelper = require('./common_helper');

function addWidget(req, res) {
  let widget = req.crudify.result;

  Display.findById(widget.display)
    .then(display => {
      if (!display) {
        return res.status(404).json({ error: 'Display not found' });
      }
      display.widgets.push(widget._id);
      return display.save()
        .then(savedDisplay => {
          if (!savedDisplay) {
            return res.status(500).json({ error: 'Display not saved' });
          }
          if (!res.headersSent) {
            return res.json({ success: true });
          }
        });
    })
    .catch(err => {
      console.error(err);
      if (!res.headersSent) {
        return res.status(500).json(err);
      }
    });
}

async function deleteWidget(req, res, next) {
  try {
    const widget = req.crudify.result;

    // Kiểm tra Widget và Display
    if (!widget || !widget.display) {
      if (!res.headersSent) return res.status(404).json({ error: 'Widget or Display not found' });
      return;
    }

    const display = await Display.findById(widget.display);
    if (!display) {
      if (!res.headersSent) return res.status(404).json({ error: 'Display not found' });
      return;
    }

    // Xóa widget khỏi danh sách widgets của Display
    display.widgets = display.widgets.filter(value => !widget._id.equals(value));
    await display.save();

    // Phát sóng cập nhật
    try {
      await CommonHelper.broadcastUpdate(res.io);
    } catch (broadcastErr) {
      console.error('Broadcast update error:', broadcastErr);
      // Không cần gửi phản hồi mới vì phản hồi chính đã gửi
    }

    // Gửi phản hồi thành công
    if (!res.headersSent) return res.json({ success: true });
  } catch (err) {
    console.error('Delete widget error:', err);

    // Gửi phản hồi lỗi nếu tiêu đề chưa được gửi
    if (!res.headersSent) {
      return res.status(500).json({ error: 'An error occurred', details: err });
    }

    // Chuyển lỗi cho middleware tiếp theo nếu cần
    next(err);
  }
}

module.exports = {
  deleteWidget,
  addWidget
};
