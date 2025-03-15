const express = require('express');
const router = express.Router();
const db = require('./database');

// Mendapatkan semua hasil pemindaian
router.get('/scans', (req, res) => {
    const query = req.query.type ? 'SELECT * FROM scans WHERE type = ? ORDER BY timestamp DESC' : 'SELECT * FROM scans ORDER BY timestamp DESC';
    const params = req.query.type ? [req.query.type] : [];
    
    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Menambah hasil pemindaian baru
router.post('/scans', (req, res) => {
    const { content, type } = req.body;
    
    db.run('INSERT INTO scans (content, type) VALUES (?, ?)', [content, type], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            id: this.lastID,
            content,
            type
        });
    });
});

// Menandai hasil pemindaian sebagai favorit
router.put('/scans/:id/favorite', (req, res) => {
    const { id } = req.params;
    const { is_favorite } = req.body;
    
    db.run('UPDATE scans SET is_favorite = ? WHERE id = ?', [is_favorite, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Updated successfully' });
    });
});

// Menambah catatan ke hasil pemindaian
router.put('/scans/:id/notes', (req, res) => {
    const { id } = req.params;
    const { notes } = req.body;
    
    db.run('UPDATE scans SET notes = ? WHERE id = ?', [notes, id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Notes updated successfully' });
    });
});

// Menghapus hasil pemindaian
router.delete('/scans/:id', (req, res) => {
    const { id } = req.params;
    
    db.run('DELETE FROM scans WHERE id = ?', id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Deleted successfully' });
    });
});

module.exports = router; 