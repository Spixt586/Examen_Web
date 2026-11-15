package com.examen.recclaje.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.examen.recclaje.entidades.Reciclaje;
import com.examen.recclaje.repository.ReciclajeRepository;

@Service
public class ReciclajeServices {
	
	private final ReciclajeRepository reciclajeRepository;
	
	public ReciclajeServices(ReciclajeRepository reciclajeRepository) {
		this.reciclajeRepository = reciclajeRepository;
	}

	public List<Reciclaje> listar() {
		return reciclajeRepository.findAll();
	}

	public Reciclaje registrar(Reciclaje reciclaje) {
		return reciclajeRepository.save(reciclaje);
	}
}
