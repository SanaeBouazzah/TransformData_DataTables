<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom', [
                'attr' => ['id' => 'nom']
            ])
            ->add('prenom', [
                'attr' => ['id' => 'prenom']
            ])
            ->add('username', [
                'attr' => ['id' => 'username']
            ])
            ->add('password', [
                'attr' => ['id' => 'password']
            ])
            ->add('position', [
                'attr' => ['id' => 'position']
            ])
            ->add('adresse', [
                'attr' => ['id' => 'adresse']
            ])
            ->add('Tel1', [
                'attr' => ['id' => 'Tel1']
            ])
            ->add('Tel2', [
                'attr' => ['id' => 'Tel2']
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
