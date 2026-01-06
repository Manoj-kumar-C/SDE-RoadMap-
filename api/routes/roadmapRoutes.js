// api/routes/roadmapRoutes.js
const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Roadmap:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier
 *           example: 1
 *         title:
 *           type: string
 *           description: Roadmap title
 *           example: Frontend
 *         description:
 *           type: string
 *           description: Roadmap description
 *           example: A comprehensive guide to frontend development
 *         downloadUrl:
 *           type: string
 *           description: PDF download URL
 *           example: https://sde-roadmaps.s3.ap-south-1.amazonaws.com/pdf/frontend.pdf
 *         imageUrl:
 *           type: string
 *           description: Roadmap image URL
 *         faqs:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 */

/**
 * @swagger
 * /api/roadmap:
 *   get:
 *     summary: Get all roadmaps
 *     tags: [Roadmaps]
 *     responses:
 *       200:
 *         description: List of all roadmaps
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Roadmap'
 */
router.get('/', roadmapController.getRoadmapItems);

/**
 * @swagger
 * /api/roadmap/{id}:
 *   get:
 *     summary: Get a roadmap by ID
 *     tags: [Roadmaps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Roadmap ID
 *     responses:
 *       200:
 *         description: Roadmap details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Roadmap'
 *       404:
 *         description: Roadmap not found
 */
router.get('/:id', roadmapController.getRoadmapItemById);

// Create a new roadmap item,
// Fixing Post Security Issue 
//router.post('/', roadmapController.createRoadmapItem);

module.exports = router;

