const radius = 10.0;
const maxForce = 0.02;    // Maximum steering force
const maxVelocity = 12;    // Maximum speed
const minVelocity = 0.03;	// Minimum velocity, after which flower blooms

const petalScale = 0.3;

const caWeight = 10.0;
const vmWeight = 1.0;
const fcWeight = 1.0;
const decWeight = 0.1;	// Scale from 0.0 - 1.0

const collisionDistance = 8 * radius;