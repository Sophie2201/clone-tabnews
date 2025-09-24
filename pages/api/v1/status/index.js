function status(request, response) {
  response.status(200).json({ chave: "Gnarly" });
}

export default status;
