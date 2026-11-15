package com.examen.recclaje.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examen.recclaje.entidades.Reciclaje;
import com.examen.recclaje.services.ReciclajeServices;

@RestController
@RequestMapping("/api/puntos")
@CrossOrigin(origins = "http://localhost:5173")
public class ReciclajeController {
	private final ReciclajeServices service;

	public ReciclajeController(ReciclajeServices service) {
		super();
		this.service = service;
	}
	
	@PostMapping
	public ResponseEntity<?> guardar(@RequestBody Reciclaje reciclaje){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(service.registrar(reciclaje));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al guardar el reciclaje" + e.getMessage());
		}
	}
	
	@GetMapping
	public  ResponseEntity<?> listar(){
		try {
			List<Reciclaje> reciclaje = service.listar();
			return ResponseEntity.ok(reciclaje);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error al listar los proyectos" + e.getMessage());
		}
	}
}
