package floresnataren.duenios.modelo;

public class DuenioMascota extends Duenio{
    private Mascota[] mascotas;

    public DuenioMascota() {
    }

    public DuenioMascota(Mascota[] mascotas) {
        this.mascotas = mascotas;
    }

    public DuenioMascota(int id, String nombre, String telefono, String direccion, String email, Mascota[] mascotas) {
        super(id, nombre, telefono, direccion,email);
        this.mascotas = mascotas;
    }

    public DuenioMascota(int id, String nombre, String telefono, String direccion, String email) {
        super(id, nombre, telefono, direccion,email);
    }

    public Mascota[] getMascotas() {
        return mascotas;
    }

    public void setMascotas(Mascota[] mascotas) {
        this.mascotas = mascotas;
    }
}
