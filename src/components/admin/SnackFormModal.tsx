import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCinema } from "@/contexts/CinemaContext";
import { SnackItem } from "@/data/snacks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SnackFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  snack?: SnackItem | null;
}

const SnackFormModal = ({ isOpen, onClose, snack }: SnackFormModalProps) => {
  const { addSnack, updateSnack } = useCinema();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "combo" as SnackItem["category"],
  });

  useEffect(() => {
    if (snack) {
      setFormData({
        name: snack.name,
        description: snack.description,
        price: snack.price.toString(),
        image: snack.image,
        category: snack.category,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "combo",
      });
    }
  }, [snack, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const snackData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price.replace(",", ".")),
      image: formData.image || "/placeholder.svg",
      category: formData.category,
    };

    if (snack) {
      updateSnack(snack.id, snackData);
    } else {
      addSnack(snackData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto glass-strong rounded-2xl p-6 m-4 scrollbar-cinema">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {snack ? "Editar Item" : "Novo Item"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nome *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Combo Família"
              required
              className="bg-background/50"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Descrição *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="1 Pipoca Grande + 2 Refrigerantes..."
              required
              className="bg-background/50 min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Preço (R$) *</label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="29,90"
                required
                className="bg-background/50"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Categoria *</label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value as SnackItem["category"] })
                }
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="combo">Combo</SelectItem>
                  <SelectItem value="pipoca">Pipoca</SelectItem>
                  <SelectItem value="bebida">Bebida</SelectItem>
                  <SelectItem value="doce">Doce</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">URL da Imagem</label>
            <Input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
              className="bg-background/50"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" variant="gold" className="flex-1">
              {snack ? "Salvar Alterações" : "Adicionar Item"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SnackFormModal;
