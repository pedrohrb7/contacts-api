const { response } = require("express");
const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.json(contact);
  }

  async store(request, response) {
    // insere
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Say your name!" });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: "This email is already in use" });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    // atualiza
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: "User not found" });
    }

    if (!name) {
      return response.status(400).json({ error: "Say your name!" });
    }

    const contactById = await ContactsRepository.findByEmail(email);

    if (contactExists && contactById.id !== id) {
      return response
        .status(400)
        .json({ error: "This email is already in use" });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    // deleta um valor
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: "User not found" });
    }

    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
